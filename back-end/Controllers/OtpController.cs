using Microsoft.AspNetCore.Mvc;
using back_end.Entities;

[Route("api/otp")]
[ApiController]
public class OtpController : ControllerBase
{
    private readonly MailServe _emailService;

    public OtpController(MailServe emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("send-email")]
    public async Task<IActionResult> SendOtp([FromBody] OtpRequest request)
    {
        if (string.IsNullOrEmpty(request.Email))
            return BadRequest("Email không hợp lệ");

        bool isSent = await _emailService.SendOtpAsync(request.Email);
        return isSent ? Ok("OTP đã gửi!") : StatusCode(500, "Không thể gửi OTP.");
    }

    [HttpPost("verify")]
    public IActionResult VerifyOtp([FromBody] OtpVerifyRequest request)
    {
        if (string.IsNullOrEmpty(request.Otp) || string.IsNullOrEmpty(request.Email))
            return BadRequest("OTP hoặc Email không hợp lệ");

        bool isValid = _emailService.VerifyOtp(request.Email, request.Otp);
        return isValid ? Ok("OTP hợp lệ!") : BadRequest("OTP không đúng hoặc đã hết hạn!");
    }
}