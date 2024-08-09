// Crie uma função que recebe um número como parâmetro e retorna a tabuada desse
// número até o número 10. Utilize um laço for para gerar os múltiplos do número.


Console.WriteLine($"Bem vindo(a) a tabuada!");
Console.WriteLine($"Selecione o número que você deseja ter a tabuada");
int numeroEscolhido = int.Parse(Console.ReadLine()!);

void tabuada(int numero)
{
    for (int i = 0; i < 11; i++)
    {
        Console.WriteLine($"{numero} X {i} = {numero * i} ");
    }
}

tabuada(numeroEscolhido);



