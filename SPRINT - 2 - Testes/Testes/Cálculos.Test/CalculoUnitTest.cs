using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cálculos.Test
{
    public class CalculoUnitTest
    {
        [Fact]
        public void SomarDoisNumeros()
        {
            var n1 = 3.3;
            var n2 = 2.2;
            var valorEsperado = 5.5;

            var soma = Cálculo.Somar(n1, n2);

            Assert.Equal(valorEsperado, soma);  
        }

        [Fact]
        public void SubtarirDoisNumeros()
        {
            var n1 = 3;
            var n2 = 2;
            var valorEsperado = 1;

            var subtrai = Cálculo.Subtrair(n1, n2);

            Assert.Equal(valorEsperado, subtrai);
        }

        [Fact]
        public void DividirDoisNumeros()
        {
            var n1 = 10;
            var n2 = 2;
            var valorEsperado = 5;

            var dividi = Cálculo.Dividir(n1, n2);

            Assert.Equal(valorEsperado, dividi);
        }

        [Fact]
        public void MultiplicarDoisNumeros()
        {
            var n1 = 3;
            var n2 = 3;
            var valorEsperado = 9;

            var multiplica = Cálculo.Multiplicar(n1, n2);

            Assert.Equal(valorEsperado, multiplica);
        }

        [Fact]
        public void Modulo()
        {
            var n1 = -3;
           
            var valorEsperado = 3;

            var modular = Cálculo.Modular(n1);

            Assert.Equal(valorEsperado, modular);
        }

    }
}
