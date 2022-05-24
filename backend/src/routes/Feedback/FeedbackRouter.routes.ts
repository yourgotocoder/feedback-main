import { NextFunction, Request, Response, Router } from "express";
import FeedbackController from "../../controllers/Feedback";
import { connectToCluster } from "../../models/DatabaseHandler";
import { Db } from "mongodb";

class FeedbackRouter {
    private _router = Router();
    private _controller = FeedbackController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    private _configure() {
        this._router.get(
            "/",
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    await connectToCluster(
                        process.env.DB_CONNECTION_STRING as string,
                        (client) => {
                            const db: Db = client.db("feedback-questions");
                            console.log(
                                `Connected to db: ${db.databaseName} from router`
                            );
                        }
                    );
                    const result = this._controller.defaultMethod();
                    res.status(200).json(result);
                } catch (error) {
                    next(error);
                }
            }
        );
    }
}

export = new FeedbackRouter().router;
