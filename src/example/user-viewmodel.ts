import { ViewModel } from '../core/view-model.js';
import { User, fetchUser } from './user-model.js';

export class UserViewModel extends ViewModel {
    constructor() {
        super();
        this.createBinding('user', null);
        this.createBinding('loading', true);
        this.createBinding('error', null);
    }

    async loadUser(id: number) {
        const userBinding = this.getBinding('user')!;
        const loadingBinding = this.getBinding('loading')!;
        const errorBinding = this.getBinding('error')!;

        try {
            loadingBinding.set(true);
            errorBinding.set(null);
            userBinding.set(null);
            
            const user = await fetchUser(id);
            userBinding.set(user);
        } catch (error) {
            errorBinding.set(error instanceof Error ? error.message : 'Failed to load user');
        } finally {
            loadingBinding.set(false);
        }
    }

    refreshUser() {
        const user = this.getBinding('user')!.get();
        if (user) {
            this.loadUser(user.id);
        }
    }
}
