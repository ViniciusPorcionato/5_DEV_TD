using Conversao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConversaoUnitTest
{
    public class UnitTest
    {
        [Fact]
        public void ConverterTemperatura()
        {
            var temp1 = 30;
            var tempEsperada = 86;

            var temperatura = Conversao.ConversaoFahrenheit.ConverterCelsiusParaFahrenheit(temp1);

            Assert.Equal(tempEsperada, temperatura);
        }
    }
}
