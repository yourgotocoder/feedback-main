import { Router } from "express";
import FeedbackRouter from "./Feedback/FeedbackRouter.routes";
// import ThemeBRouter from './themeB/ThemeBRouter';

class MasterRouter {
    private _router = Router();
    private _subrouterA = FeedbackRouter;
    //   private _subrouterB = ThemeBRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching routers.
     */
    private _configure() {
        this._router.use("/feedback", this._subrouterA);
        // this._router.use('/themeB', this._subrouterB);
    }
}

export = new MasterRouter().router;
