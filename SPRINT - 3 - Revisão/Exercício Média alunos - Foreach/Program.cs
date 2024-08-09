
// 5) Você vai criar um programa que armazena as notas de vários alunos em diferentes disciplinas. O programa deve calcular a média de cada aluno e determinar quais alunos têm médias acima de 7.0 (aprovados) e quais têm médias abaixo de 7.0 (reprovados). O programa deve usar foreach para iterar sobre as coleções de alunos e suas notas.

// Especificações:

// - Armazene as notas de 3 disciplinas para cada aluno.
// - Calcule a média de cada aluno.
// - Exiba a média e o status (aprovado/reprovado) de cada aluno.
// - Use foreach para iterar sobre os alunos e as disciplinas.

class Program
{
    static void Exercicio(string[] args)
    {
        // Criando a lista de alunos
        List<Aluno> alunos = new List<Aluno>();

        // Adicionando alguns alunos à lista com notas fictícias
        alunos.Add(new Aluno("Vinicius", new List<double> { 8.0, 9.0, 7.5 }));
        alunos.Add(new Aluno("Vitor", new List<double> { 6.0, 7.0, 6.5 }));
        alunos.Add(new Aluno("Tiago", new List<double> { 8.5, 9.5, 10.0 }));

        // Iterando sobre a lista de alunos
        foreach (var aluno in alunos)
        {
            double media = CalcularMedia(aluno.Notas);
            string status = media >= 7.0 ? "Aprovado" : "Reprovado";

            Console.WriteLine($"Nome: {aluno.Nome}, Média: {media:F2}, Status: {status}");
        }
    }

    static double CalcularMedia(List<double> notas)
    {
        return notas.Average();
    }
}

class Aluno
{
    public string Nome { get; set; }
    public List<double> Notas { get; set; }

    public Aluno(string nome, List<double> notas)
    {
        Nome = nome;
        Notas = notas;
    }
}