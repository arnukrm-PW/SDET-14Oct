const testData =[ {
    username:"standard_user",
    password:"secret_sauce",
    expected:"success"

},{

  username:"locked_out_user",
    password:"secret_sauce",
    expected:"Locked"

},
{
      username:"problem_user",
    password:"secret_sauce",
    expected:"success"
}
]
module.exports=testData