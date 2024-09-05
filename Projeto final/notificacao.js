/**
 * A notification page component
 */
class NotificationPageComponent {
    #markReadBtn;
    #notifications;

    /**
     * Constructor expects no argument. When called an event listener is added to the button.
     */
    constructor() {
        this.#markReadBtn = /** @type {HTMLButtonElement} */ (
            document.querySelector('.notification--page_removed-btn')
        );
        this.#notifications = /** @type {NodeList} */ (
            document.querySelectorAll('.notification--page_activity')
        );

        if (this.#markReadBtn) {
            this.#markReadBtn.addEventListener(
                'click',
                this.#readNotifications.bind(this)
            );
        }
    }

    /**
     * @param {Event} evtObj
     */
    #readNotifications(evtObj) {
        let unreadCount = 0;

        this.#notifications.forEach(function (notification) {
            const notificationElement = /** @type {HTMLElement} */ (notification);
            if (notificationElement.classList.contains('unread')) {
                notificationElement.classList.remove('unread');
                notificationElement.classList.add('read');
                unreadCount++;
            }
        });

        if (unreadCount > 0) {
            const notificationAmount = /** @type {HTMLElement} */ (
                document.querySelector('.notification--page_amount > span')
            );
            if (notificationAmount) {
                notificationAmount.textContent = '0';
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NotificationPageComponent();
});