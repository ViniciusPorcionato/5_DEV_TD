Console.WriteLine($"Hello World");

Console.WriteLine($"Informe a nota 1");
float nota1 = float.Parse(Console.ReadLine());
Console.WriteLine($"Informe a nota 2");
float nota2 = float.Parse(Console.ReadLine());
Console.WriteLine($"Informe a nota 3");
float nota3 = float.Parse(Console.ReadLine());

float media = ((nota1 + nota2 + nota3) / 3);

if (media > 7)
{
    Console.WriteLine($"Aluno Aprovado");
    
}
else if(media = 7)
{
    Console.WriteLine($"Aluno de recuperação");
    
}
else
{
    Console.WriteLine($"Aluno Reprovado");
    
}