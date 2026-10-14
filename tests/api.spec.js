const{test,expect}=require('@playwright/test')
const { url } = require('inspector')
const { hasUncaughtExceptionCaptureCallback } = require('process')

test("TC_01 GET request and validation",async ({request})=>{
//     Question 7 — 
// Write a Playwright API test to:
// - Send GET request to /users/1.
const response =await  request.get("https://jsonplaceholder.typicode.com/users/1")
const status = await response.status()
// - Verify status code 200.
console.log(status)
await expect(status).toBe(200)
const body = await response.json()// - Verify the user's id is 1.
await expect(body.id).toBe(1)
await expect(body.name).toBeDefined()
await expect(body.email).toBeDefined()
// - Verify name and email exist.
})

test("TC_02 - POST request with runtime JSON",async ({request})=>{
   // Question 

   // - Update the title dynamically using a JavaScript variable before the POST call.
   const title = "ARun KUmar singh"
 const response = await  request.post("https://jsonplaceholder.typicode.com/posts",{data:{
  "title": title,
  "body": "Runtime JSON testing",
  "userId": 1
}})
// Requirements:
// - Verify status 201.
await expect(response.status()).toBe(201)
// - Verify the response title.
const body = await response.json()
await expect(body.title).toBe("ARun KUmar singh")
// - Verify userId is 1.
await expect(body.id).toBe(101)

})
test("TC_03 - PATCH request",async ({request})=>{
// 2. Set title dynamically to "Updated at runtime".
    const title = "Updated at runtime"
    // Send a PATCH request.
const response = await request.patch("https://jsonplaceholder.typicode.com/posts/1",{data:{

"title": title

}})

const body = await response.json()
// Now write a test to update only the job field.
// Use this endpoint:
// https://jsonplaceholder.typicode.com/posts/1
// Requirements:
// 1. 

// 3. Verify status code 200.
await expect(await response.status()).toBe(200)
// 4. Verify the response title matches your variable.
await expect(body.title).toBe("Updated at runtime")
// 5. Verify the response id is 1.
await expect(body.id).toBe(1)
})

test("TC_04 - DELETE API testing",async ({request})=>{
const response=await request.delete("https://jsonplaceholder.typicode.com/posts/1")
//     Question 10 — 
// Now try a DELETE request.
// Requirements:
// 1. Send a DELETE request to https://jsonplaceholder.typicode.com/posts/1.

// 2. Verify status code 200.
await expect(response.status()).toBe(200)
// 3. Do not assume the response contains JSON.

// 4. Explain why calling await response.json() may fail if the response body is empty.
//const body = await response.json()
// (because return no json body for delete method)
})

test("TC_05- API authentication", async ({ request }) => {

    // Step 1: Send login POST request

    const response=await request.post("https://jsonplaceholder.typicode.com/posts",{data:{
        header: {
                     "accessToken": "abc123xyz",
                    "userId": 10
                }
    }})
    // Use the API's documented login endpoint and credentials

    // Step 2: Read the login response JSON
    const body =await response.json()
    // Step 3: Extract accessToken
    const token = await body.accessToken
    // Step 4: Send GET request with Authorization header
    const responseGet = await request.get("https://jsonplaceholder.typicode.com/users/1",{
        headers:{
            Authorization:`Bearer${token}`,

        }
    })
    // Step 5: Verify status code 200
    await expect(responseGet.status()).toBe(200)
});

test("TC_06 - API chaining: POST se generated ID lekar GET request bhejna.",async ({request})=>{
    const title = "API chaining"
    const response = await request.post("https://jsonplaceholder.typicode.com/posts",{data:{
         "title": title,
         "body": "Runtime JSON testing",
         "userid": 1
        
    }})
    const jsonBody = await response.json()
    console.log(jsonBody)
    console.log(jsonBody.id)
    console.log(jsonBody.title)
    console.log(jsonBody.body)
    const useridG =await  jsonBody.userid
    //Post generated ID
    const responseGetter = await request.get(`https://jsonplaceholder.typicode.com/posts/${useridG}`)
    await expect.soft( responseGetter.status()).toBe(200)


})
test("TC-07 error handling",async ({request})=>{
    const url = "https://jsonplaceholder.typicode.com/posts/1"
   let response ;
   for(let retry = 1 ; retry <=3 ; retry ++){
 response =await request.get(url)
 const status = await response.status()
    console.log(`response status  = ${response.status()}`)
if(status==200){
    console.log("status identified as 200")
    break;
}else if(status!==503){
    console.log("Status 503 not found - retry stop")
}}
console.log(await response.json())
})

test("TC-08 - API response time",async({request})=>
{
    const url = "https://jsonplaceholder.typicode.com/posts/1"
    const response = await request.get(url)
    await expect(response.status()).toBe(200)
   const time = await response.timing()
   const timeTaken = time.responseEnd-time.startTime
   console.log(`time taken to complete ${timeTaken.toFixed(2)}ms`)
    // console.log(timeTaken)
    await expect(timeTaken).toBeLessThan(1780)
// Next question — Q14: API response time
// Aapko API response time test karna hai.
// Requirement:
// - GET request bhejo.
// - Response status 200 verify karo.  
// - Response time 2 seconds se kam hona chahiye.
// - Agar response 2 seconds ya usse zyada leta hai, test fail hona chahiye.
})

test("TC-09 -API response headers ",async ({request})=>{
const url = "https://jsonplaceholder.typicode.com/posts/1"
//     Next interview question — Q15: API response headers
// Aapko ek GET API test karni hai:
const response = await request.get(url)
const jsonBody = await response.json()
const header = await response.headers()
console.log(header["content-type"])
console.log(jsonBody)
// - API status 200 verify karein.
await expect.soft(response.status()).toBe(200)
// - Content-Type header verify karein ki woh JSON response indicate karta hai.
await expect.soft(header["content-type"]).toContain("json")
// - Confirm karein ki response body valid JSON hai.
await expect.soft(Array.isArray(jsonBody)).toBeFalsy()
})
test("TC-10 - API schema validation",async ({request})=>{
    const url = "https://jsonplaceholder.typicode.com/posts/1"
//     Next question — Q16: API schema validation
const response = await request.get(url)
const jsonBody = await response.json()
console.log(jsonBody)
// Ab isi API ke response mein verify kijiye:
// 1. id ka type number ho.
await expect.soft(typeof jsonBody.id).toBe("number")
// 2. title ka type string ho.
await expect.soft(typeof jsonBody.title).toBe("string")
// 3. body ka type string ho.
await expect.soft(typeof jsonBody.body).toBe("string")
// 4. userId ka type number ho.
await expect.soft(typeof jsonBody.userId).toBe("number")
})
test("TC-11 -API negative testing",async ({request})=>{

   const  url = "https://jsonplaceholder.typicode.com/posts/9999"
  const response =   await request.get(url)
  const jsonBody = await response.json()
  console.log(response.status())
  console.log(await response.text())
  await expect.soft(response.status()).toBe(404)
  await expect.soft(response.statusText).not.toBe(200)
//     Next question — Q17: API negative testing
// Endpoint: https://jsonplaceholder.typicode.com/posts/9999
// Aapko:
// 1. GET request bhejni hai.
// 2. Actual status code verify karna hai.
// 3. Response body inspect karke expected behavior assert karna hai.
// Important: JSONPlaceholder ek demo API hai. Unknown ID ka response actual mein inspect karein; bina check kiye 404 ya {} assume mat karein.
})
test("TC-12 - API POST validation",async({request})=>{
//     Next question — Q18: API POST validation
// https://jsonplaceholder.typicode.com/posts par POST request bhejiye.
// Requirements:
// 1. title, body aur userId bhejein.
// 2. Status code 201 verify karein.
// 3. Response ke title aur body ko sent values se compare karein.
// 4. Verify karein ki response mein id number hai.
const url = "https://jsonplaceholder.typicode.com/posts"
const title = "API POST validation"
const body = "Body of API Response"
const reponse=await request.post(url,{data:{
    'title':title,
    'body':body,
    'userId': 1 
    // body aur userId bhejein
}})
// 1. title, body aur userId bhejein.
console.log(await reponse.status())
// 2. Status code 201 verify karein.
await expect.soft( reponse.status()).toBe(201)
// 3. Response ke title aur body ko sent values se compare karein.
const jsonBody = await reponse.json()
await expect.soft(jsonBody.title).toBe(title)
await expect.soft(jsonBody.body).toBe(body)

// 4. Verify karein ki response mein id number hai.
await expect.soft(jsonBody.id).toBeDefined()
await expect.soft(typeof jsonBody.id).toBe("number")

})
test("TC-13 -PUT API validation ",async ({request})=>{
//     Next question — Q19: PUT API validation
// Ab https://jsonplaceholder.typicode.com/posts/1 par PUT request likhiye.
const url = "https://jsonplaceholder.typicode.com/posts/1"
const title = "updated Title"
const body = "updated Body"
const userid = 2
// 1. title, body aur userId update karein.
const response=await request.put(url,{data:{
    'title' : title ,
    'body' : body ,
    'userid' : userid
}})
const jsonBody = await response.json()
// 2. Status code 200 verify karein.
await expect.soft(response.status()).toBe(200)
console.log(jsonBody)
// 3. Response ke title aur body ko sent values se compare karein.
await expect.soft(jsonBody.title).toBe(title)
// 4. Response mein id number hai, yeh verify karein.
await expect.soft(jsonBody.id).toBeDefined()
// Aap code likhkar bhejiye; main review karke score dunga.
})
test("TC-14 - DELETE API validation ",async ({request})=>{
const url = "https://jsonplaceholder.typicode.com/posts/1"
// Q20 — DELETE API validation
const response = await request.delete(url)
// Ab aap khud code likhiye.
// Endpoint: https://jsonplaceholder.typicode.com/posts/1
// Requirements:
// 1. request.delete() use karein.
// 2. Status code 200 verify karein.
await expect.soft(response.status()).toBe(200)
// 3. Response body empty hai ya nahi, check karein.
const text = await response.text()
await expect.soft(text).toBe("{}")
await expect.soft(text).toEqual("{}")
// const jsonBody = await response.json()
// await expect.soft(jsonBody)
// 4. Test mein meaningful assertions likhein.

})
test("TC-15 - API chaining (POST → GET)",async ({request})=>{

const url = "https://jsonplaceholder.typicode.com/posts"
const title = "POST title"
const bodyPOST = "POST BODY"
   const response =  await request.post(url,{data:{
        'title':title,
        "body":bodyPOST,
        'userId' : 1
    }})

//     Q21 — API chaining (POST → GET)
// Ab agla interview-level question solve karein.
// Endpoint: https://jsonplaceholder.typicode.com/posts
// 1. POST request bhejein with title, body aur userId.
// 2. Status code 201 verify karein.
await expect.soft(await response.status()).toBe(201)
const bodyRes =await response.json()

console.log( bodyRes)
console.log(await bodyRes.body)
// 3. Response se id extract karein.
await expect.soft(bodyRes.body).toEqual(bodyPOST)
const idPOST = await bodyRes.id
console.log(idPOST)
// 4. id use karke GET request karein: /posts/{id}.
const modifiedURL = `https://jsonplaceholder.typicode.com/posts/${idPOST}`
console.log(modifiedURL)
const responseGet=await request.get(modifiedURL)
// 5. GET status code 200 aur response id verify karein.
console.log(responseGet.status())
const bodyGet = await responseGet.json()
await expect(responseGet.status()).toBe(404)
console.log(bodyGet.id)
await expect(bodyGet.id).not.toEqual(idPOST)
// Code khud likhkar bhejiye. Main review, score aur simple Hinglish explanation dunga.
})

test("TC-16 - API chaining with authentication token",async ({request})=>{

// Q22 — API chaining with authentication token
// Ab ek level aage badhte hain.
// Aapko ek login API se token nikal kar next API request mein bhejna hai.
// Requirements:
const url = "https://dummyjson.com/auth/login"
const data = {
        username: "emilys",
        password: "emilyspass"  
}
const responsePOST = await request.post(url,{data:data})
console.log(responsePOST.status())
const jsonBody = await responsePOST.json()
const accessBearerToken = await jsonBody.accessToken
console.log(jsonBody)
console.log(accessBearerToken)
const getURL = `https://dummyjson.com/auth/me`
const responseGET=await request.get(getURL,{headers:{
    Authorization: `Bearer ${accessBearerToken}`
}})
console.log(responseGET.status())
const jsonGetBody = await responseGET.json()
// // 1. Login endpoint ko POST request bhejein.
// // 2. Response se token extract karein.
// // 3. Token ko Authorization: Bearer <token> header mein use karein.
// // 4. Protected API ka status code verify karein.
await expect(responseGET.status()).toBe(200)
// // 5. Response body ka ek important field validate karein.
console.log(jsonGetBody)

await expect(typeof jsonGetBody.id).toBe("number")
await expect(jsonGetBody.email).toBeDefined()
await expect(jsonGetBody.email).toContain("@")

// Aap apna code likhkar bhejiye. Main score aur line-by-line Hinglish explanation dunga.

})