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
export const loginPage = new RouterPath('/login');
export const addNewPhrasePage = new RouterPath('/myapp/add-phrase');
export const dictionaryPage = new RouterPath('/myapp/dictionary');
export const initProfilePage = new RouterPath('/myapp/init-profile');
