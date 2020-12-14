
const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException');


ResourceNotFoundException


class AuthorizationService {
    verifyPermission(project, user) {

        if (!project) {
            throw new ResourceNotFoundException();
        }

        if (user.id !== project.user_id) {
            throw new InvalidAccessException();
        }
    }
}

module.exports = new AuthorizationService();
