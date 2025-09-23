import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams, useLocation, replace } from "react-router-dom";

const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue
    }
    return parseInt(param)
}

const useCustomMove = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [queryParams] = useSearchParams()
    const [refresh, setRefresh] = useState(false)

    const page = getNum(queryParams.get(`page`), 1)
    const size = getNum(queryParams.get(`size`), 10)
    const queryDefault = createSearchParams({ page, size }).toString()
    const location = useLocation();

    const moveToList = (pageParam) => {
        let queryStr = ""

        if (pageParam) {
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 10)
            queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString()
        } else
            queryStr = queryDefault

        setRefresh(!refresh)
        navigate({ pathname: './', search: queryStr })
    }

    const moveToModify = (id) => {
        console.log(queryDefault)

        navigate({
            pathname: `../modify/${id}`,
            search: queryDefault
        })
    }

    const moveToRead = (id) => {
        console.log(queryDefault)
        navigate({
            pathname: `read/${id}`,
            search: queryDefault
        })
    }

    const moveToPath = (path, replace) => {
        navigate({ pathname: path }, { replace: replace })
    }

    return { moveToList, page, size, moveToModify, moveToRead, moveToPath, refresh }
}

export default useCustomMove;