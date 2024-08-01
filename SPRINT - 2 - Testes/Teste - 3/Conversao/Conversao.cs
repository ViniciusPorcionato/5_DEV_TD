using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Conversao
{
    public static class ConversaoFahrenheit
    {
        //Exercício 3: Teste de Conversão de Temperatura
        //Crie um teste unitário para o método ConverterCelsiusParaFahrenheit que verifica se a conversão de Celsius para Fahrenheit é calculada corretamente.

       public static double ConverterCelsiusParaFahrenheit(double X)
        {
            return ((X * 1.8) + 32);
        }
    }
}
