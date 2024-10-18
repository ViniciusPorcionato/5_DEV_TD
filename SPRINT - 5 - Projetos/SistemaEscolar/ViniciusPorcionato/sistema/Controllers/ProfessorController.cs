using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sistema.Contexts;
using sistema.Models;

namespace sistema.Controllers
{
    public class ProfessorController : Controller
    {

        private readonly SistemaContext _context;

        public ProfessorController(SistemaContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // Tenta obter o ID do professor da sessão HTTP.
            int? professorId = HttpContext.Session.GetInt32("ProfessorId");

            //Verifica se o Id do professor é diferente de nulo
            if (professorId == null)
            {
                // Se o ID for nulo, redireciona para a ação "Index" do controlador "Login".
                return RedirectToAction("Index", "Login");
            }

            // Busca o professor no banco de dados pelo ID.
            var professor = _context.Professors.Find(professorId);

            // Faz uma consulta para listar todas as turmas associadas ao professor.
            var turmas = _context.Turmas.Where(x => x.ProfessorId == professorId).ToList();

            // Armazena o nome do professor na ViewBag para ser utilizado na view.
            ViewBag.NomeProfessor = professor!.Nome;

            // Retorna a view passando a lista de turmas.
            return View(turmas);
        }

        [HttpPost]
        public IActionResult CadastrarTurma( string nomeTurma)
        {
           int? professorId = HttpContext.Session.GetInt32("ProfessorId");

            var turma = new Turma
            {
                Nome = nomeTurma,
                ProfessorId = professorId
            };

            _context.Turmas.Add(turma);

            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult DeletarTurma(int turmaId)
        {
            var turma = _context.Turmas.Include(t => t.Atividades).FirstOrDefault(t => t.TurmaId == turmaId);

            if (turma!.Atividades.Any())
            {
                TempData["Mensagem"] = "Você não pode excluir uma turma com atividades";

                return RedirectToAction("Index");
            }

            _context.Turmas.Remove(turma);
            
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}
