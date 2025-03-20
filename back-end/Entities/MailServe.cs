using System;
using System.Collections.Concurrent;
using System.Net;
using System.Net.Mail;
using back_end.Entities;
using Microsoft.Extensions.Options;

public class MailServe
{
    private readonly MailSettings _mailSettings;
    private static readonly ConcurrentDictionary<string, (string Otp, DateTime Expiry)> _otpStorage = new();

    public MailServe(IOptions<MailSettings> mailSettings)
    {
        _mailSettings = mailSettings.Value;
    }

    public async Task<bool> SendOtpAsync(string email)
    {
        string otp = new Random().Next(100000, 999999).ToString();
        _otpStorage[email] = (otp, DateTime.UtcNow.AddMinutes(5));

        try
        {
            using (var smtp = new SmtpClient(_mailSettings.Host, _mailSettings.Port))
            {
                smtp.Credentials = new NetworkCredential(_mailSettings.SenderMail, _mailSettings.SenderPass);
                smtp.EnableSsl = true;

                var message = new MailMessage
                {
                    From = new MailAddress(_mailSettings.SenderMail ?? throw new InvalidOperationException("SenderEmail is not configured."), "Quản lý kho hàng"),
                    Subject = "Yêu cầu mã OTP quên mật khẩu",
                    Body = $"<p>Xin chào,</p><p>Mã OTP của bạn là: <strong>{otp}</strong></p><p><strong>Không</strong> chia sẻ mã này. Chúng tôi sẽ <strong>không bao giờ </strong>liên hệ với bạn để yêu cầu mã này. Nếu bạn không yêu cầu mã này, bạn không cần thực hiện thêm hành động nào nữa.</p><p>Cảm ơn,</p><p>Quản lý kho hàng</p>",
                    IsBodyHtml = true,
                };
                message.To.Add(email);

                await smtp.SendMailAsync(message);
                return true;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Lỗi gửi email: {ex.Message}");
            return false;
        }
    }

    public bool VerifyOtp(string email, string otp)
    {
        if (_otpStorage.TryGetValue(email, out var storedOtp))
        {
            if (storedOtp.Expiry > DateTime.UtcNow && storedOtp.Otp == otp)
            {
                _otpStorage.TryRemove(email, out _);
                return true;
            }
        }
        return false;
    }
}