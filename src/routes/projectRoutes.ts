import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controller/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controller/TaskController";
import { projectExists } from "../middleware/project";
import { taskExists, taskBelongToProject } from "../middleware/task";

const router = Router();

//POST /api/projects
router.post("/", 
    body ('projectName').notEmpty().withMessage('El nombre del proyecto es requerido'),
    body ('clientName').notEmpty().withMessage('El nombre del cliente es requerido'),
    body ('description').notEmpty().withMessage('La descripción es requerida'),
    body ('startDate').notEmpty().withMessage('La fecha de inicio es requerida'),
    body ('endDate').notEmpty().withMessage('La fecha de fin es requerida'),
    body ('status').notEmpty().withMessage('El estado es requerido'),
    handleInputErrors,
    ProjectController.creteProject
);

//GET /api/projects
router.get("/", ProjectController.getAllProjects);

//GET /api/projects/:id
router.get("/:id", 
    param('id').isMongoId().withMessage('ID no VALIDO'),
    handleInputErrors,
    ProjectController.getProjectById
);

//UPDATE /api/projects/:id
router.put("/:id", 
    param('id').isMongoId().withMessage('ID no VALIDO'),
    body ('projectName').notEmpty().withMessage('El nombre del proyecto es requerido'),
    body ('clientName').notEmpty().withMessage('El nombre del cliente es requerido'),
    body ('description').notEmpty().withMessage('La descripción es requerida'),
    body ('startDate').notEmpty().withMessage('La fecha de inicio es requerida'),
    body ('endDate').notEmpty().withMessage('La fecha de fin es requerida'),
    body ('status').notEmpty().withMessage('El estado es requerido'),
    handleInputErrors,
    ProjectController.updateProject
);

//DELETE /api/projects/:id
router.delete("/:id", 
    param('id').isMongoId().withMessage('ID no VALIDO'),
    handleInputErrors,
    ProjectController.deleteProject
);


/* ROUTES FOR TASKS */
router.param('projectId', projectExists);

//CREATE /api/:projectId/tasks
router.post('/:projectId/tasks',
    body ('title').notEmpty().withMessage('El nombre de la tarea es requerido'),
    body ('description').notEmpty().withMessage('La descripción de la tarea es requerida'),
    handleInputErrors,
    TaskController.createTask
)

//GET /api/:projectId/tasks
router.get('/:projectId/tasks',
    TaskController.getProjectTask
) 

router.param('taskId', taskExists);
router.param('taskId', taskBelongToProject);

//GET /api/:projectId/tasks/:taskId
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no VALIDO'),
    handleInputErrors,
    TaskController.getTaskById
) 

//UPDATE /api/:projectId/tasks/:taskId
router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no VALIDO'),
    body ('title').notEmpty().withMessage('El nombre de la tarea es requerido'),
    body ('description').notEmpty().withMessage('La descripción de la tarea es requerida'),
    handleInputErrors,
    TaskController.updateTask
) 

//DELETE /api/:projectId/tasks/:taskId
router.delete("/:projectId/tasks/:taskId", 
    param('taskId').isMongoId().withMessage('ID no VALIDO'),
    handleInputErrors,
    TaskController.deleteTask
);

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no VALIDO'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)

router.post('/:projectId/tasks/:taskId/priority',
    param('taskId').isMongoId().withMessage('ID no VALIDO'),
    body('priority').notEmpty().withMessage('La prioridad es obligatoria'),
    handleInputErrors,
    TaskController.updatePriority
)

export default router;
