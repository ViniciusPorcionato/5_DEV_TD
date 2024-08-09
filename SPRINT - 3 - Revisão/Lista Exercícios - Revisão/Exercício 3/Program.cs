// Crie um programa que calcule a soma dos números pares de um vetor de 10 elementos.
// Utilize um laço for para percorrer o vetor e uma estrutura condicional if para identificar
// os números pares.

float[] numeros = new float[10];

float soma = 0;

Console.WriteLine($"Insira números");

for (int i = 0; i < 10; i++)
{
    Console.WriteLine($"Coloque um número");
    numeros[i] = float.Parse(Console.ReadLine()!); 

    if (numeros[i] % 2 == 0)
    {
        soma += numeros[i] ;
    }
}


Console.WriteLine($"Resultado dos números pares : {soma}");



