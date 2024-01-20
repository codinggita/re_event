const testapi = async (req, res) => {
    try {
        const { name } = await req.body;
        res.status(200).json({ message: `Hello ${name}` });
    } catch (error) {
        console.log(error)
    }
}   