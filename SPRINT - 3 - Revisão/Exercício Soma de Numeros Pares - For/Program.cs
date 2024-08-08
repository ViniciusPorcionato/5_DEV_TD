Console.WriteLine($"Somar números de 1 a 100");

int num = 1;

int soma = 0;

while (num <= 100)
{
    if (num % 2 == 0)
    {
        soma += num;
    }

    num ++;
}

Console.WriteLine($"{soma}");