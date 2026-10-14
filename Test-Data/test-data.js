const testData =[ {
    username:"standard_user",
    password:"secret_sauce",
    expected:"success"

},
{

  username:"locked_out_user",
    password:"secret_sauce",
    expected:"Locked"

},
{
      username:"problem_user",
    password:"secret_sauce",
    expected:"success"
}
,
{
      username:"performance_glitch_user",
    password:"secret_sauce",
    expected:"success"
},
{
      username:"error_user",
    password:"secret_sauce",
    expected:"success"
},
{
      username:"visual_user",
    password:"secret_sauce",
    expected:"success"
}
]
module.exports=testData