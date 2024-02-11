const express = require('express');
const router = express.Router();

const controller = require('../Controllers/ContactController');

/**
 * @swagger
 * /contact/ajouter:
 *   post:
 *     summary: Ajouter un contact
 *     description: Ajoute un nouveau contact à la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               tel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact ajouté avec succès
 *         content:
 *           application/json:
 *             example:
 *               message: "Contact ajouté avec succès."
 *               contact:
 *                 nom: "John Doe"
 *                 tel: "1234567890"
 *                 _id: "65c8172b59a0181f65224090"
 *                 createdAt: "2024-02-11T00:39:07.910Z"
 *                 updatedAt: "2024-02-11T00:39:07.910Z"
 *                 __v: 0
 *       400:
 *         description: Les données requises ne sont pas fournies
 *         content:
 *           application/json:
 *             example:
 *               message: "Le nom et le téléphone sont requis."
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             example:
 *               message: "Erreur interne du serveur."
 */

router.post('/contact/ajouter',controller.ajouterContact);
router.get('/contact/lister',controller.listerContact);
router.put('/contact/:id/modifier',controller.modifierContact);
router.delete('/contact/:id/supprimer',controller.supprimerContact);

//Utilisation des routes à l'exterieur
module.exports= router;
