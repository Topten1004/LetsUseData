using EFModel;
using LMSLibrary;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace EmailSender
{
    internal static class EmailSender
    {
        private const int courseInstanceId = 16;

        private static void SendPasswordEmail()
        {
            MaterialEntities data = new MaterialEntities();
            IEnumerable<Student> students = data
                .CourseInstances
                .Where(ci => ci.Id == courseInstanceId)
                .FirstOrDefault()
                .Students
                .Where(s => s.Email != null);

            string original = File.ReadAllText(@"..\..\Message.txt");

            foreach (Student student in students)
            {
                string msg = original.Replace("<Password>", student.Password);

                EmailHelper.SendEmail(
                        new EmailHelper.From
                        {
                            DisplayName = "Marcelo Guerra Hahh",
                            Password = "#Password",
                            UserName = "marcelo@letsusedata.com"
                        },
                        new EmailHelper.Message
                        {
                            Subject = "Learning System Password",
                            Recipient = student.Email,
                            Body = msg
                        }
                     );
            }
        }

        private static void Main(string[] args)
        {
            SendPasswordEmail();
        }
    }
}
