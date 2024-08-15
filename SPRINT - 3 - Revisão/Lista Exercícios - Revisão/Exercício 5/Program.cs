// Crie um programa que peça ao usuário para digitar um texto e conte quantas vezes cada
// letra do alfabeto aparece no texto.

Console.Write("Digite o texto: ");
string texto = Console.ReadLine()!;

string alfabeto = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
int[] contagem = new int[alfabeto.Length];

for (int i = 0; i < texto.Length; i++)
{
    char letra = Char.ToLower(texto[i]);
    if (alfabeto.Contains(letra))
    {
        contagem[alfabeto.IndexOf(letra)]++;
    }
}

Console.WriteLine("Contagem de letras:");
for (int i = 0; i < alfabeto.Length; i++)
{
    if (contagem[i] > 0)
    {
        Console.WriteLine($"{alfabeto[i]}: {contagem[i]}");
    }
}