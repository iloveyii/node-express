// @desc   Get all from List
// @route  GET /api/v1/list
export const getList = async (req: any, res: any, next: any) => {
    try {
        const list = [{id: 1, name: "aaaa"}, {id: 2, name: "bbb"}];
        return res.status(200).json({
            success: true,
            data: list
        });
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

// @desc   Add to List
// @route  POST /api/v1/list
export const addList = async (req: any, res: any, next: any) => {
    try {
        const list = [{id: 1, name: "post"}];
        return res.status(200).json({
            success: true,
            data: list
        });
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

// @desc   Update List
// @route  PUT /api/v1/list/1
export const updateList = async (req: any, res: any, next: any) => {
    try {
        const list = [{id: 1, name: "put"}];
        return res.status(200).json({
            success: true,
            data: list
        });
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};

// @desc   Delete List
// @route  DELETE /api/v1/list
export const deleteList = async (req: any, res: any, next: any) => {
    try {
        const list = [{id: 1, name: "delete"}];
        return res.status(200).json({
            success: true,
            data: list
        });
    } catch (error) {
        res.send(500).json({
            success: false,
            error: "Server error"
        });
    }
};