---
title: JWT - Java, Security Lesson
---

## What is JWT
- JSON Web Token (JWT)
    - popular way to authenticate users in a web application. It is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed using JSON Web Signature (JWS).
    - Compact, url safe means of representing claims to securely transmit information between parties.
        - These claims are encoded as JSON objects that are digitally signed using a JSON web signature
    - Concise and efficient representation, allows for ease of transmissions over networks
    - No need to reference external source/database to validate info
- Common use cases:
    - Authentication
    - information exchange
    - Authorization
    - Secure your APIs!

Popcorn hack: list 3 real world applications of JWT: 
 - Bank account signins
 - Transferring confidential transactions/info
 - storing account information securely in the browser
 - Personal identification


## Why do you need JWT
JSON Web Tokens (JWT) are crucial for secure and efficient user authentication in web development. 
- They help manage user identity and sessions across different parts of a system. 
- They play a key role in stateless authentication, allowing servers to verify user identity without storing session data.
- JWTs are especially useful in decentralized systems, enabling smooth communication between different services and ensuring secure user roles and permissions. 
- JWTs simplify and enhance user authentication in modern web development.

<h1>Components of JWT</h1>

- What is a web token?
    - A web token is a piece of information that represents a user's identity or session and is used for authentication and authorization in web applications. It is typically a string of characters, often encoded in a JSON format, and is digitally signed to ensure its integrity.

- This is the structure of a JSON Web Token: 

1. Header
    - The header typically consists of two parts: the type of the **token**, which is JWT, and the **algorithm** that is used, such as HMAC SHA256 or RSA SHA256. It is Base64Url encoded to form the first part of the JWT
2. Payload
    - Claims and user data
    - claims are statements about the entity (users)
    - There are three types of claims: 
        - registered: predefined claims that are no mandatory but recommended
        - **public**: claims defined within the IA and JSON web token registry
        - private: custom claims created to share information between parties that agree to using them
3. Signature
    - Ensuring integrity and authenticity
    - verify the sender of the JWT
    - function
        - Creating a signature
        - Verification process
        - Signature tampering activity

<h1>Deep Dive into Anatomy of JWT</h1>

- Navigate to this website: [Link](https://jwt.io/)

Encoded: Json Web Token (what you send to and from the client)
Decoded: algorithm, data, verify token hasn't been changed


<span style="color:red;">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<span style="color:purple;">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.<span style="color:blue;">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


```java
// header
{
    "alg": "HS256", //type of sign in algorithm used for encoding and decoding
    "typ": "JWT"    //type of token
}
```

- Base 64 encoded
- useful to signature type to decode


```java
// payload
{
"sub": "123", //example of a registered claim
"name": "jwt lesson",
"iat": 1516239022",
"authorities": [
    "ADMIN",    
    "MANAGER"
],
"extra-claims": "some data here"
}

```

- where all different data for applciation is
- sub = subject : id of user you're authenticating
- iat = issued at (when token was created)
- exp/eat = expired at (date when toke becomes invalid)


```java
//signature
{
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    your-256-bit-secret
) secret base64 encoded
}
```

- verify user does not change with token before it is sent back to you
- input your secret key
- uses algorithm in header to encode data (header + payload) using specific secret key
- if header/payload is changed, signature will not match

Header


```java
import java.util.Base64;

public class JwtHeaderExample {
    public static void main(String[] args) {
        // JWT Header
        String algorithm = "HS256";
        String type = "JWT";

        // Combine Header properties
        String header = "{\"alg\":\"" + algorithm + "\",\"typ\":\"" + type + "\"}";

        // Base64 URL encode the header
        String base64UrlHeader = Base64.getUrlEncoder().encodeToString(header.getBytes());

        System.out.println("JWT Header: " + base64UrlHeader);
    }
}

// Run this code
JwtHeaderExample.main(null);

```

    JWT Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9


Payload


```java
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class JwtPayloadExample {
    public static void main(String[] args) {
        // JWT Payload (Claims)
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", "Grace");
        claims.put("class", "CSA");
        claims.put("exp", System.currentTimeMillis() + 1800000); // 30 minutes expiration

        // Convert Claims to JSON and Base64 URL encode the payload
        String payload = mapToJson(claims);
        String base64UrlPayload = Base64.getUrlEncoder().encodeToString(payload.getBytes());

        System.out.println("JWT Payload: " + base64UrlPayload);
    }

    private static String mapToJson(Map<String, Object> map) {
        // Implement JSON conversion logic (use your preferred approach)
        return "{ \"customKey\": \"customValue\" }";
    }
}

// Run This Code
JwtPayloadExample.main(null);
```

Signature


```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class JwtSignatureExample {
    public static void main(String[] args) {
        // Secret key for encoding and decoding
        String secretKey = "your secret key";

        // Combine Header and Payload with a period '.'
        String base64UrlHeader = "base64UrlHeader"; // Placeholder for the actual base64UrlHeader
        String base64UrlPayload = "base64UrlPayload"; // Placeholder for the actual base64UrlPayload
        String headerPayload = base64UrlHeader + "." + base64UrlPayload;

        // Generate HMAC SHA-256 signature
        byte[] signature = HmacSha256(headerPayload, secretKey);

        // Base64 URL encode the signature
        String base64UrlSignature = Base64.getUrlEncoder().encodeToString(signature);

        System.out.println("JWT Signature: " + base64UrlSignature);
    }

    private static byte[] HmacSha256(String data, String key) {
        try {
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKey);
            return sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Error while generating HMAC SHA-256", e);
        }
    }
}

// Run
JwtSignatureExample.main(null);
```

<h3>Putting It Together</h3>

Popcorn hack: write some comments that identify each part of the JWT
- header: Contains information as to the name and type of the token and algorithm that is used for encryption.
- payload: Contains the actual data that is being encrypted and secured
- signature: Used for verification that the JWT was sent by the proper person. Typically, this is a cryptographic hash generated by the secret key.
- algorithm: The algorithm used to encrypt the payload
- secret key: The secret key used to obfuscate the secret, shared between both ends of the communication.

etc


```java
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class JwtGenerator {

    public static void main(String[] args) {
        String secretKey = "yourSecretKey";
        String subject = "userId123";
        long expirationTimeMillis = System.currentTimeMillis() + 3600000;

        String jwt = buildJwt(secretKey, subject, expirationTimeMillis);

        System.out.println("Generated JWT: " + jwt);
    }

    private static String buildJwt(String secretKey, String subject, long expirationTimeMillis) {
        String header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
        String payload = "{\"sub\":\"" + subject + "\",\"iat\":" + System.currentTimeMillis() / 1000 +
                ",\"exp\":" + expirationTimeMillis / 1000 + "}";

        String encodedHeader = base64UrlEncode(header);
        String encodedPayload = base64UrlEncode(payload);

        String dataToSign = encodedHeader + "." + encodedPayload;
        String signature = signData(dataToSign, secretKey);

        return dataToSign + "." + signature;
    }

    private static String base64UrlEncode(String input) {
        return Base64.getUrlEncoder().encodeToString(input.getBytes(StandardCharsets.UTF_8));
    }

    private static String signData(String data, String secretKey) {
        try {
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKeySpec);
            byte[] signature = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return base64UrlEncode(new String(signature, StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new RuntimeException("Error signing JWT", e);
        }
    }
}

JwtGenerator.main(null);
```

    Generated JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VySWQxMjMiLCJpYXQiOjE3MDMwMDE3OTIsImV4cCI6MTcwMzAwNTM5Mn0=.24Tvv71877-9AQjvv71I77-977-977-977-9WO-_ve-_ve-_ve-_vQXvv73vv71bGe-_ve-_ve-_vSHbue-_vQ==


<h1> JWT with Spring Boot </h1>

<h2> Big Idea </h2>
<img alt="JWTProcess" src="{{site.baseurl}}/images/JwtProcess.png">

1. JwtAuthFilter is executed first (validates and checks JWT Tokens)
    - Internal check to check if the token is there or not. 
    - Extracts the subject (username or email)
    - If token is missing → 403 error sent
    - If token is there:
        - Makes a call using the UserDetails Service to fetch user info from the database. Uses the subject extracted to do so
        - Response comes back from the database (user either exists or doesn't)
        - If the user does not exist → 403 error sent
        - If user exists → validate JWT process is started

2. Validate JWT Process
- Calls the jwt service which takes the user and jwt token as parameters
- Token isn't valid → 403 error sent
- Token is valid → update the security context holder and set the connected user. User is now authenticated yay!
    - Automatically dispatch request → sent to dispatcher servlet → sent to controller → allow all execution user wants to do 
    - Sends http 200

Here is a diagram that makes it easier to understand the process tha happens between JWT and the API calls. 
<img alt="JWTApi" src="{{site.baseurl}}/images/JwtAPI.png">

- User posts with their login information
- server does authentication to confirm the user
- store the user in the memory of the server, send a corresponding ID with a cookie back to the client
- Now every time the user sends a request, the cookie with that corresponding ID gets send to the server which verifies the ID and sends back a response.

Popcorn Hack: Create your own diagram to help visualize the JWT process
![Jwt Flowchart](/assets/img/jwt/jwt_flowchart.png)

<h2> JWT Walkthrough </h2>
- Clone this repo and follow along in each JWT file: https://github.com/vivianknee/jwtlessonBackend.git

<h3> Logic flow </h3>
<b>Step 1 (Client - Login Request):</b> The client sends a login request with user credentials (username and password) to the /authenticate endpoint.

<b>Step 2 (JwtApiController):</b>
- The JwtApiController receives the login request.
- It authenticates the user credentials using the AuthenticationManager.
- If authentication is successful:
Retrieves user details using the PersonDetailsService.
Generates a JWT using the JwtTokenUtil.
Sends the JWT as an HTTP-only secure cookie in the response.

<b>Step 3 (Client - Subsequent Requests):</b>
- The client includes the JWT cookie in the headers of subsequent requests.

<b>Step 4 (JwtRequestFilter):</b>
- For each incoming request, the JwtRequestFilter intercepts the request.
- Extracts the JWT from the HTTP request headers or cookies.
- Validates the JWT using the JwtTokenUtil.
- If the token is valid, sets up authentication using Spring Security's SecurityContextHolder.

<b>Step 5 (Spring Security):</b>
- Spring Security processes the request with the authenticated user.
- The application can now authorize the user based on the roles and permissions associated with the JWT.

<b>Step 6 (Error Handling - JwtAuthenticationEntryPoint):</b>
- If the JWT is missing, invalid, or expired, and the request requires authentication, the JwtAuthenticationEntryPoint handles the authentication failure.
- Responds with an HTTP 401 (Unauthorized) status.


## Storing JWT
There are a few different options for storing a JWT in a JavaScript application:

1. Cookies: You can store the JWT in a cookie and send it back to the server with each request. This is a simple and widely-supported option, but it has some limitations. For example, you can’t access cookies from JavaScript on a different domain, and some users may have cookies disabled in their browser settings.

2. Local storage: You can store the JWT in the browser’s local storage (localStorage) or session storage (sessionStorage). This option allows you to access the JWT from JavaScript on the same domain, but it is vulnerable to cross-site scripting (XSS) attacks, where an attacker can inject malicious code into your application and steal the JWT from the storage.

3. HttpOnly cookie: You can store the JWT in an HttpOnly cookie, which is a cookie that can only be accessed by the server and not by client-side JavaScript. This option provides some protection against XSS attacks, but it is still vulnerable to other types of attacks, such as cross-site request forgery (CSRF).

## Postman 
1. Trying to access /api/person/ without jwt token stored in Cookies
- <img alt="nojwt" src="{{site.baseurl}}/images/nojwt.png">

2. Trying to access /api/person/ with a wrong jwt token stored in Cookies
- <img alt="wrongjwt" src="{{site.baseurl}}/images/wrongjwt.png">

3. Trying to access /api/person/ with a jwt token that does not have the signature
- <img alt="nosignature" src="{{site.baseurl}}/images/nosignature.png">

4. Accessing /api/person/ with generated jwt token stored in Cookies header
- <img alt="yes" src="{{site.baseurl}}/images/yes.png">

## Implementation Approaches and Security Considerations

JWTs are signed to ensure they cannot be modified in transit. Signature is a crucial aspect of JWT security.

Key Usage
- Token Issuance: When the token is issued by the authorization server, it is signed with a key.
- Token Reception: When the client receives the token, the signature is validated using the key.


```java
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;

public class TokenReceptionExample {

    // Simulate receiving a token from the client
    private static String receiveTokenFromClient() {
        // In a real scenario, this would be received from the client (e.g., from a request header)
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiAiMTIzIiwgImV4cCI6IDE2MjM5NzYzODF9.4X1lC5fU4dV1n9l02LZyGQSy5K-O5fnZM0t6eO-w2Qs";
    }

    public static void main(String[] args) {
        // Example of Token Reception
        String receivedToken = receiveTokenFromClient();
        System.out.println("Received Token: " + receivedToken);
    }
}
```

Symmetric vs. Asymmetric Key Approaches
- Symmetric Key: A single secret key is used both to sign and validate the token.
- Asymmetric Key: Different keys are used to sign and validate the token, only the authorization server has the ability to sign it.


```java
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

public class SymmetricKeyValidationExample {

    // Symmetric Key for Token Signing and Validation
    private static Key symmetricKey = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);

    // Token Validation with Symmetric Key
    private static Claims validateTokenSymmetric(String token) {
        try {
            // Parse and verify the token using the symmetric key and the HS256 algorithm
            Jws<Claims> claimsJws = Jwts.parserBuilder().setSigningKey(symmetricKey).build().parseClaimsJws(token);
            return claimsJws.getBody();
        } catch (ExpiredJwtException e) {
            // Handle case where the token has expired
            System.out.println("Token has expired");
        } catch (MalformedJwtException e) {
            // Handle case where the token is invalid (e.g., tampered with)
            System.out.println("Invalid token");
        }
        return null;
    }

    public static void main(String[] args) {
        // Example of Token Validation with Symmetric Key
        String receivedToken = receiveTokenFromClient();
        Claims validatedClaims = validateTokenSymmetric(receivedToken);
        if (validatedClaims != null) {
            System.out.println("Validated Payload: " + validatedClaims);
        }
    }
}
```

Additional Security Considerations
- Token Scope: limit token access to specific resources or actions
- Token Revocation: implement mechanism to revoke token if user's access needs to be taken away
- Token Encryption: encrypt token if it contains sensitive information that shouldn't be visible (even if intercepted)
- Regular Key Rotation: rotate keys regularly for security and to limit the impact of compromised key

## Hacks
1. Implementation 
- Implement a simple authentication system using JWT with Java. Show how JWT works with postman. Get the request to be authorized

2. MC Knowledge test (5) 
    - Which part of the JWT contains the actual data (claims)? 
        - Header
        - <mark>Payload</mark>
        - Signature
        - Encryption
    - What is the purpose of the header in a JWT?
        - It contains the signature for the JWT.
        - <mark>It identifies the algorithm used to generate the signature.</mark> 
        - It holds the encrypted data. 
        - It contains the user's information.
    - How are the parts of a JWT (header, payload, and signature) separated?
        - Comma
        - <mark>Period</mark>
        - Colon
        - Semicolon
    - Which algorithm is commonly used for JWT signatures?
        - <mark>HMAC</mark> (Hash-based Message Authentication Code)
        - RSA (Rivest-Shamir-Adleman)
        - AES (Advanced Encryption Standard)
        - MD5 (Message Digest Algorithm 5)
    - How are JWTs commonly transmitted?
        - Only via HTTP headers
        - Only as query parameters in the URL
        - In the request body as JSON
        - <mark>Any of the above, depending on the application</mark>
