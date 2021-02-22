import { AuthState } from 'app/slices/types';
import { ArticlesState } from 'app/pages/ArticlesPage/Articles/slice/types';
import { ArticleState } from 'app/pages/ArticlePage/slice/types';
import { CommentsState } from 'app/pages/ArticlePage/Comments/slice/types';
import { ArticleNewState } from 'app/pages/ArticleNewPage/ArticleEditor/slice/types';
import { ArticleEditState } from 'app/pages/ArticleEditPage/ArticleEditor/slice/types';
import { LoginState } from 'app/pages/LoginPage/slice/types';
import { RegisterState } from 'app/pages/RegisterPage/slice/types';
import { ProfileState } from 'app/pages/ProfilePage/slice/types';

export interface RootState {
  auth: AuthState;
  login: LoginState;
  register: RegisterState;
  profile: ProfileState;
  articles?: ArticlesState;
  comments?: CommentsState;
  article?: ArticleState;
  articleNew?: ArticleNewState;
  articleEdit?: ArticleEditState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
