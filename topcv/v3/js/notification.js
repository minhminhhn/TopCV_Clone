var notification = new Vue({
    el: '#nav-notification',
    data() {
        return {
            open: false,
            fetched: false,
            notifications: [],
            loading: false,
            loadedAll: false,
            newNotification: 0,
        }
    },
    computed: {
        isFirstLoading() {
            return this.fetched == false
        },
        ignoredIds() {
            return this.notifications.map(i => i.id).join(',')
        },
        notiTitle() {
            if (this.newNotification > 0) {
                return `Bạn có ${this.newNotification} thông báo chưa đọc`
            }
            return 'Không có thông báo mới'
        }
    },
    mounted() {
        const vm = this
        const target = $('#nav-notification');
        $(document).mouseup(function(e) {
            if (!target.is(e.target) && target.has(e.target).length === 0) {
                vm.open = false
            }
        });
        this.countNewNotification()
    },
    updated() {
        var vm = this
        $('[data-toggle="tooltip-body"]').tooltip({
            container: 'body'
        });
        $('#nav-notification li.body.done').on('scroll', function() {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                vm.fetchData()
            }
        })
        $('#nav-notification .dropdown-menu').on('click', function(event) {
            event.stopPropagation();
        });
    },
    methods: {
        markViewed(notification) {
            notification.viewed = 1
            if (this.newNotification >= 1) {
                this.newNotification--
            }
            $.ajax({
                url: `/notification/${notification.id}/change-status`,
                type: 'POST',
                data: {
                    status: 1
                }
            })
        },
        toggleViewed(notification) {
            notification.viewed = notification.viewed == 1 ? 0 : 1
            if (notification.viewed == 0) {
                this.newNotification++
            } else if (this.newNotification >= 1) {
                this.newNotification--
            }
            $.ajax({
                url: `/notification/${notification.id}/change-status`,
                type: 'POST',
                data: {
                    status: notification.viewed
                }
            })
        },
        markViewedAll() {
            this.notifications.map(i => i.viewed = 1)
            this.newNotification = 0
            $.ajax({
                url: '/notification/mark-viewed-all',
                type: 'POST'
            })
        },
        async countNewNotification() {
            const response = await $.ajax({
                url: '/notification/count-new-notification'
            })
            if (response.status == 'success') {
                this.newNotification = response.data.count
            } else {
                console.log(response)
            }
        },
        toggle() {
            this.open = !this.open
            this.fetchData()
        },
        async fetchData() {
            if (this.loading || this.loadedAll) {
                return
            }
            this.loading = true
            const response = await $.ajax({
                type: 'POST',
                url: '/notification/list',
                data: {
                    ignored_ids: this.ignoredIds,
                    ignore_type: 'create_cv_success',
                }
            })
            if (response.status == 'success') {
                response.data.notifications.forEach(noti => {
                    let index = this.notifications.findIndex(i => i.id == noti.id)
                    if (index == -1) {
                        this.notifications.push(noti)
                    }
                })
                this.loadedAll = response.data.total == 0
            } else {
                console.log(response)
            }
            this.fetched = true
            this.loading = false
        }
    }
})