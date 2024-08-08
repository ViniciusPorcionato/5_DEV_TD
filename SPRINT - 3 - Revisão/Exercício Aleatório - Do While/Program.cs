using System.Security.Cryptography;

Console.WriteLine($"Tente adivinha o número!!!");

int numAleatorio = RandomNumberGenerator.GetInt32(1, 100);
int tentativas = 0;

Console.WriteLine($"Insira o número");
int numEscolhido = int.Parse(Console.ReadLine()!);
tentativas++;

if (numEscolhido != numAleatorio)
{
    do
    {
        Console.WriteLine($"Insira o número");
        numEscolhido = int.Parse(Console.ReadLine()!);
        tentativas++;

        if (numEscolhido != numAleatorio)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"Tente novmente !");
            if (numEscolhido < numAleatorio)
            {
                Console.ForegroundColor = ConsoleColor.DarkRed;
                Console.WriteLine($"O Numéro é Maior que o palpite atual !");
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.DarkCyan;
                Console.WriteLine($"O Numéro é menor que o palpite atual !");
            }

        }
    } while (numEscolhido != numAleatorio);
}
Console.ForegroundColor = ConsoleColor.DarkMagenta;
Console.WriteLine($"Parabéns você acertou!!!! ");
Console.WriteLine($"Número de tentativas : {tentativas}");