export default function(_req, res) {
    return res.status(404).json({error: "Unknown endpoint"})
}