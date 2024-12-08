export function generateVerifyEmailTemplate(
  fullName: string,
  verificationUrl: string
): string {
  return `
 <html>
 <head>
 <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
 </head>
 <body class="bg-light">
 <div class="container mt-5">
  <div class="card">
  <div class="card-body">
  <h1 class="card-title">Welcome to Nomomics, ${fullName}!</h1>
  <p class="card-text">Thank you for joining Nomomics. To complete your registration, please verify your email address by using the OTP below:</p>
  <h2 class="card-text text-center">${verificationUrl}</h2>
  <p class="card-text mt-3">If you did not create an account with Nomomics, you can safely ignore this email.</p>
  <p class="card-text">Best regards,<br/>The Nomomics Team</p>
  </div>
  </div>
 </div>
 </body>
 </html>
 `;
}
