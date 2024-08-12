interface PathParams {
  queries?: Record<string, string>;
}

class RouterPath {
  readonly path: string = '';
  constructor(path: string) {
    this.path = path;
  }
  getPath({ queries }: PathParams) {
    let newPath = this.path;
    if (queries) {
      newPath += `?${new URLSearchParams(queries).toString()}`;
    }
    return newPath;
  }
}

// /myapp - is privet routes
export const login = new RouterPath('/login');
export const addNewPhrase = new RouterPath('/myapp/add-phrase');
export const dictionary = new RouterPath('/myapp/dictionary');
export const initProfile = new RouterPath('/myapp/init-profile');
