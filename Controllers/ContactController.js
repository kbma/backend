const ContactModel = require('../Models/Contact');

// Fonction utilitaire pour valider le numéro de téléphone
function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[2-9]\d{7}$/; // Format de numéro : 8 chiffres
    return phoneRegex.test(phoneNumber);
}

// Fonction utilitaire pour valider le nom
function isValidName(nom) {
    const nomRegex = /^[a-zA-Z]{2,20}$/;
    return nomRegex.test(nom);
}

// Fonction pour ajouter un contact
const ajouterContact= async (req, res) => {
    try {
        // Assurez-vous que les données nécessaires sont présentes dans le corps de la requête
        const { nom, tel } = req.body;

        if (!nom || !tel) {
            return res.status(400).json({ message: 'Le nom et le téléphone sont requis.' });
        }

        // Créer un nouvel objet contact à partir des données de la requête
        const contact = new ContactModel({ nom, tel });

        // Sauvegarder le contact dans la base de données
        const savedContact = await contact.save();

        // Retourner une réponse avec le contact ajouté
        return res.status(200).json({ message: 'Contact ajouté avec succès.', contact: savedContact });
    } catch (err) {
        // Gérer les erreurs de manière appropriée
        console.error(err);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};

const listerContact=(req,res)=>{
    //Les traitements necessaires pour lister les contacts  
      ContactModel.find({}).exec().then((liste)=>{
        return res.status(200).json({liste})
      }).catch((err) => {
        res.status(400).json({message:err});
      });
  
  }

//Modifier contact
const modifierContact = async(req, res) => {
    try {
        const { nom, tel } = req.body; // Utilisation de req.query pour récupérer les paramètres de la requête

        if (!nom || !tel) {
            return res.status(400).json({ success: false, message: 'Les champs "nom" et "tel" sont requis pour la modification.' });
        }

        // Les traitements nécessaires pour modifier un contact
        const contactUpdated = await ContactModel.findByIdAndUpdate(
            req.params.id,
            { nom, tel },
            { new: true, runValidators: true }
        ).exec();

        if (!contactUpdated) {
            return res.status(404).json({ success: false, message: 'Aucun contact trouvé avec cet ID.' });
        }

        return res.status(200).json({ success: true, contactUpdated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};

const supprimerContact = async (req, res) => {
    try {
        // Les traitements nécessaires pour supprimer un contact
        const contactDeleted = await ContactModel.findByIdAndDelete(req.params.id).exec();

        if (!contactDeleted) {
            return res.status(404).json({ success: false, message: 'Aucun contact trouvé avec cet ID.' });
        }

        return res.status(200).json({ success: true, contactDeleted });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
};




  module.exports={
    listerContact,
    ajouterContact,
    modifierContact,
    supprimerContact
  }
