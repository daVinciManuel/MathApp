import express from 'express';

const router = express.Router();

router.get("/n1/suma", (req, res) => {
    const sumaN1 = [
        {
            num1: 8,
            num2: 4,
            operator: "suma",
            result: 12
        },
        {
            num1: 9,
            num2: 4,
            operator: "suma",
            result: 13
        },
        {
            num1: 8,
            num2: 6,
            operator: "suma",
            result: 14
        },
        {
            num1: 10,
            num2: 100,
            operator: "suma",
            result: 100
        },
        {
            num1: 6,
            num2: 5,
            operator: "suma",
            result: 11
        }
    ]
    res.status(200).json(sumaN1);
})

export default router;