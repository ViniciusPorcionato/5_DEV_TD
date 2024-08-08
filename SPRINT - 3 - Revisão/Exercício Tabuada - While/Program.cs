Console.ForegroundColor = ConsoleColor.DarkMagenta;
Console.WriteLine($"Informe um número :");
int num = int.Parse(Console.ReadLine()!);
// int num = Convert.ToInt32(Console.ReadLine());

for (int i = 0; i <= 10; i++)
{
    Console.ForegroundColor = ConsoleColor.DarkCyan;
    Console.WriteLine($"{num} x {i} = {num * i}");
}
