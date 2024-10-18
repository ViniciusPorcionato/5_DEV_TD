using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema.Contexts;
using sistema.Models;

namespace sistema.Controllers
{
    public class AtividadesController : Controller
    {
        private readonly SistemaContext _context;

        public AtividadesController(SistemaContext context)
        {
            _context = context; 
        }
        public IActionResult Index(int turmaId)
        {
            // Recupera as atividades associadas a uma turma específica, usando o ID da turma fornecido.
            var atividades = _context.Atividades
                .Include(a => a.Turma)// Inclui informações sobre a turma relacionada a cada atividade.
                .Where(a => a.TurmaId == turmaId);// Filtra as atividades para aquelas que pertencem à turma especificada.

            // Recupera a turma correspondente ao ID fornecido.
            var turma = _context.Turmas.FirstOrDefault(x => x.TurmaId == turmaId);

            // Armazena o ID da turma no ViewBag para uso na View.
            ViewBag.TurmaId = turmaId;
            // Armazena o nome da turma no ViewBag, garantindo que a turma não seja nula
            ViewBag.NomeTurma = turma!.Nome;

            // Recupera o nome do professor da sessão HTTP e o armazena no ViewBag.
            ViewBag.NomeProfessor = HttpContext.Session.GetString("Nome");

            // Retorna a View com a lista de atividades.
            return View(atividades);
        }

        [HttpPost]
        public IActionResult CadastrarAtividade(int turmaId, string descricao)
        {
            // Busca a turma correspondente ao ID fornecido
            var turma = _context.Turmas.FirstOrDefault(t => t.TurmaId == turmaId);

            // Verifica se a turma foi encontrada
            if (turma == null)
            {
                return View();// Se a turma não existir, retorna a View atual sem fazer nada
            }

            // Cria uma nova instância de Atividade
            var novaAtividade = new Atividade
            {
                TurmaId = turmaId,// Associa a nova atividade à turma
                Descricao = descricao// Define a descrição da atividade
            };

            // Adiciona a nova atividade ao contexto do banco de dados
            _context.Atividades.Add(novaAtividade);

            // Salva as alterações no banco de dados
            _context.SaveChanges();

            // Redireciona para a ação "Index", passando o ID da turma
            return RedirectToAction("Index", new { turmaId });
        }
    }
}
