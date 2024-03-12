<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
    <style>
        body {
            text-align: center;
        }
        p {
            color: black;
        }
    </style>
</head>
<body>
    <p>Please click the button below to verify your email address:</p><br>
    <a href="http://localhost:3000/authentication/register?token={{$verificationToken}}">
    <button style="background-color: rgb(35, 86, 181); /* Green */
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 10px;
                ">Verify Email</button>
    </a>
</body>
</html>
