const urlMapping = {
    'specificQuizes': '/quizes/:id',
    'categories': '/categories',
    'postQuiz': '/quizes',
    'signup': '/signup',
    'signin': '/signin'
}

type urlKey = 'specificQuizes' | 'categories' | 'postQuiz' | 'signup' | 'signin';

const baseUrl = 'https://test-ur-knowledge.herokuapp.com';

export function getUrl( url: urlKey, params: any = {} ) {
    return Object.keys(params).reduce((acc: string, cur: string) => {
        return acc.replace(`:${cur}`, params[cur]);
    }, urlMapping[url]);
}

