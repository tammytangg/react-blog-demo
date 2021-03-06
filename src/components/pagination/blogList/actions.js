import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE, SET_ARCHIVE} from "./actionTypes";

export const fetchBlogStarted = () =>({
    type: FETCH_STARTED
});

export const fetchBlogSuccess  = (result) => ({
    type: FETCH_SUCCESS,
    result
});

export const fetchBlogFailure = (error) => ({
    type: FETCH_FAILURE,
    error
});


export const fetchBlog = (page=1, archive=null) => {
    return (dispatch,getState) => {
        //const apiUrl = `/data/page${page}.json`;
        console.log("test:"+getState().archives.archive);
        archive=getState().archives.archive;
        let apiUrl = `https://api.github.com/repos/tammytangg/react-blog-demo/issues?page=${page}&per_page=5`;
        if(archive!=null){
            apiUrl = `https://api.github.com/repos/tammytangg/react-blog-demo/issues?milestone=${archive}&page=${page}&per_page=5`;
        }


        dispatch(fetchBlogStarted())

        return fetch(apiUrl).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {
                //console.log("responseJson:"+responseJson);
                dispatch(fetchBlogSuccess(responseJson));
            }).catch((error) => {
                dispatch(fetchBlogFailure(error));
            });
        }).catch((error) => {
            dispatch(fetchBlogFailure(error));
        })
    };
}

