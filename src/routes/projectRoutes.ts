import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controller/ProjectController";
import { handleInputErrors } from "../middleware/validation";

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

router.delete("/:id", 
    param('id').isMongoId().withMessage('ID no VALIDO'),
    handleInputErrors,
    ProjectController.deleteProject
);

export default router;
