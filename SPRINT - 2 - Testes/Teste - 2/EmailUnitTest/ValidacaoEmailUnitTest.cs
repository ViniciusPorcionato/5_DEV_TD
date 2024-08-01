using Email;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmailUnitTest
{
    public class ValidacaoEmailUnitTest
    {
        [Fact]
        public void ValidarEmail()
        {
            bool emailValido = ValidacaoEmail.ValidarEmail("porcionatovinicius@gmail.com");

            Assert.True(emailValido);

        }
    }
}
