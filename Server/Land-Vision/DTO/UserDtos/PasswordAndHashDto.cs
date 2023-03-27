namespace Land_Vision.DTO.UserDtos
{
    public class PasswordAndHashDto
    {
        public new byte[] hashedPassword {get; set;}

        public new byte[] PasswordSalt {get; set;}

    }
}