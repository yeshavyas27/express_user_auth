import { Router} from "express";
import { User } from "../schemas/user.mjs";

const router = Router();

import {verifyToken} from '../utils/authMiddlewares.mjs';

router.get("/api/users/:id" , async (request, response) => {
	const { params: {id} } = request;
	const findUser = await User.findOne({ _id: id });
	if (!findUser) return response.sendStatus(404);
	return response.send(findUser);
});
	

router.patch("/api/users/:id", verifyToken, async (request, response) => {
 
	const { params: {userId} } = request;
    const {body} = request;

    try {
        // Construct the update object based on the data received
        const updateObj = {};
        if (body.email) updateObj.email = body.email;
        if (body.password) updateObj.password = body.password;
        if (body.occupation) updateObj.occupation = body.occupation;
        if (body.location) updateObj.location = body.location;

        // Update the user in MongoDB using findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(userId, updateObj);

        if (!updatedUser) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Server Error' });
    }
});
export default router;
