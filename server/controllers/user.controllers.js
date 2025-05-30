export const goToHomePage = async (req, res) => {
    try {
        res.status(200).send(req.params.id);
    } catch (error) {
        console.log("Error in home controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const goToRoom = async (req, res) => {
    try {
        res.status(200).send(req.params.roomId);
    } catch (error) {
        console.log("Error in room controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}