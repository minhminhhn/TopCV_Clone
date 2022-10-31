const TopCVConnect = new Vue({
    el: '#topcv-connect',
    data() {
        return {
            unreadConversationCount: 0
        }
    },
    created() {
        this.countUnreadConversation();
    },
    methods: {
        async countUnreadConversation() {
            let {
                data
            } = await axios.get('/messages/count-unread-conversation');
            if (data.success) {
                this.unreadConversationCount = data.count;
            }
        }
    }
})