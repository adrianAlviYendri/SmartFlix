# API Documentation

## Register User

### Endpoint

```
POST /register
```

### Description

Mendaftarkan pengguna baru dengan validasi data yang ketat.

### Request Body

| Parameter | Type   | Required | Validation                                  |
| --------- | ------ | -------- | ------------------------------------------- |
| username  | String | Yes      | Tidak boleh kosong, panjang 3-50 karakter   |
| email     | String | Yes      | Tidak boleh kosong, harus email valid, unik |
| password  | String | Yes      | Tidak boleh kosong, minimal 5 karakter      |

### Responses

#### Success Response

**Status Code:** `201 Created`

```json
{
  "message": "Register succesfully",
  "id": 1,
  "email": "johndoe@example.com"
}
```

#### Error Responses

##### 400 Bad Request (Validasi Gagal)

Jika terdapat kesalahan validasi, response menyesuaikan dengan error pertama yang terdeteksi:

```json
{
  "message": "email cannot be empty"
}
```

```json
{
  "message": "email must be a valid email address"
}
```

```json
{
  "message": "password must be at least 5 characters"
}
```

##### 400 Bad Request (Email Sudah Terdaftar)

```json
{
  "message": "email must be unique"
}
```

##### 500 Internal Server Error

Jika terjadi kesalahan di sisi server:

```json
{
  "message": "Internal Server Error"
}
```

### Example Request

```bash
curl -X POST "http://localhost:3000/register" \
     -H "Content-Type: application/json" \
     -d '{
       "username": "johndoe",
       "email": "johndoe@example.com",
       "password": "password123"
     }'
```

## User Login

### Endpoint

**POST** `/login`

### Description

Endpoint ini digunakan untuk melakukan login dengan email dan password yang valid.

### Request

#### Headers

Tidak diperlukan.

#### Body

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| email     | string | Yes      | Email pengguna yang telah terdaftar.                        |
| password  | string | Yes      | Password pengguna yang sesuai dengan akun yang didaftarkan. |

#### Contoh Request

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Responses

#### Success Response (200)

**Message:** Sukses login dengan token akses.

**Response Body:**

```json
{
  "message": "succes login",
  "access_token": "your_jwt_token_here"
}
```

#### Error Responses

1. **400 Bad Request** - Jika email atau password tidak diberikan.

   ```json
   {
     "message": "login failed, please input your email"
   }
   ```

   ```json
   {
     "message": "login failed, please input your password"
   }
   ```

2. **401 Unauthorized** - Jika email tidak ditemukan atau password salah.

   ```json
   {
     "message": "Invalid email"
   }
   ```

   ```json
   {
     "message": "Invalid password"
   }
   ```

3. **500 Internal Server Error** - Jika terjadi kesalahan pada server.
   ```json
   {
     "message": "Internal Server Error"
   }
   ```

### Notes

- Pastikan email sudah terdaftar sebelum melakukan login.
- Password harus sesuai dengan akun yang terdaftar.
- Token yang dikembalikan dapat digunakan untuk mengakses endpoint yang membutuhkan autentikasi.

## 3. Google Login

### Endpoint

```
POST /google-login
```

### Request Body

```json
{
  "googleToken": "your_google_token"
}
```

### Response

#### Success (200 / 201)

```json
{
  "message": "success login with google",
  "access_token": "your_access_token"
}
```

#### Error Responses

- **400 Bad Request** (Token is missing)

```json
{
  "message": "Token google must be filed"
}
```

- **400 Bad Request** (Invalid Google Token)

```json
{
  "message": "Token Google invalid"
}
```

---

## Error Handling

### Global Error Responses

- **400 Bad Request**: Validation errors, missing fields.
- **401 Unauthorized**: Invalid credentials, invalid token.
- **403 Forbidden**: Access denied.
- **404 Not Found**: Requested resource not found.
- **500 Internal Server Error**: Unexpected server issues.

## 4. Get Public Movies

**Endpoint:**

```
GET /public
```

**Query Params (optional):**

```
search=string (to filter movies by title)
```

**Responses:**

- **200 OK**
  ```json
  [
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "releaseDate": "string"
    }
  ]
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal Server Error" }
  ```

## 5. Get All Movies

**Endpoint:**

```
GET /movies
```

**Responses:**

- **200 OK**
  ```json
  [
    {
      "id": "integer",
      "title": "string",
      "description": "string",
      "releaseDate": "string"
    }
  ]
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal Server Error" }
  ```

## 6. Add Movie to Favorites

**Endpoint:**

```
POST /favorites/:MovieId
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Params:**

```
MovieId (integer, required)
```

**Responses:**

- **201 Created**
  ```json
  { "message": "Added to favorites" }
  ```
- **200 OK** (If movie is already favorited)
  ```json
  { "message": "Movie already favorited" }
  ```
- **404 Not Found** (If movie does not exist)
  ```json
  { "message": "Movie not found" }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal Server Error" }
  ```

---

## 7. Get Favorite Movies

**Endpoint:**

```
GET /favorites
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Responses:**

- **200 OK**
  ```json
  [
    {
      "id": "integer",
      "UserId": "integer",
      "MovieId": "integer",
      "Movie": {
        "id": "integer",
        "title": "string",
        "description": "string",
        "releaseDate": "string"
      }
    }
  ]
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal Server Error" }
  ```

---

## 8. Remove Movie from Favorites

**Endpoint:**

```
DELETE /favorites/:MovieId
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Params:**

```
MovieId (integer, required)
```

**Responses:**

- **200 OK**
  ```json
  { "message": "Favorite deleted successfully" }
  ```
- **404 Not Found** (If favorite does not exist)
  ```json
  { "message": "Favorite not found" }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal Server Error" }
  ```

---

## 9. Get User Profile

**Endpoint:**

```
GET /profile
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Responses:**

- **200 OK**
  ```json
  {
    "username": "string"
  }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal Server Error" }
  ```

---

## 10. Update User Profile

**Endpoint:**

```
PUT /profile
```

**Headers:**

```
Authorization: Bearer <access_token>
```

**Request Body:**

```json
{
  "username": "string (required)"
}
```

**Responses:**

- **200 OK**
  ```json
  { "message": "Username updated successfully", "username": "string" }
  ```
- **400 Bad Request** (Missing username)
  ```json
  { "message": "Username is required" }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal Server Error" }
  ```

---

## 11. Get Movie Recommendations

**Endpoint:**

```
POST /recommend
```

**Request Body:**

```json
{
  "preferences": "string (required)"
}
```

**Responses:**

- **200 OK**
  ```json
  ["Movie 1", "Movie 2", "Movie 3"]
  ```
- **400 Bad Request** (Missing preferences)
  ```json
  { "message": "Preferences are required" }
  ```
- **500 Internal Server Error**
  ```json
  { "message": "Internal Server Error" }
  ```
