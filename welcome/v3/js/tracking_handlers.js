window.trackingApp = new Tracking({
    debug: true,
    handlers() {
        this.on('DirectApplyFB', ({
            fbq
        }, payload) => {
            fbq('track', 'DirectApplyFB');
        })
        this.on('EarnedApplyFB', ({
            fbq
        }, payload) => {
            fbq('track', 'EarnedApplyFB');
        })
        this.on('AllApplyFB', ({
            fbq
        }, payload) => {
            fbq('track', 'AllApplyFB');
        })
        this.on('AllApply', ({
            gtag
        }, payload) => {
            initTracker();
            ga(tracker + '.send', 'event', 'AllApply', 'AllApply', 1);
        })
        this.on('AllApplyGG', ({
            gtag
        }, payload) => {
            gtag('event', 'AllApplyGG', {
                'send_to': 'AW-823531084/j5XYCJ2gmdgBEMys2IgD'
            });
        })
        this.on('AllApplyTiktok', ({
            ttq
        }, payload) => {
            ttq.instance('C3DCKS2TO1NMNN16KQ1G').track('AllApplyTiktok');
        })
        this.on('NewCV', ({
            ga
        }, payload) => {
            initTracker();
            ga(tracker + '.send', 'event', 'NewCV', 'NewCV', 1);
        })
        this.on('NewCVFB', ({
            fbq
        }, payload) => {
            fbq('track', 'NewCVFB');
        })
        this.on('NewCVGG', ({
            gtag
        }, payload) => {
            gtag('event', 'NewCVGG', {
                'send_to': 'AW-823531084/MJAZCIakmdgBEMys2IgD'
            });
        })
        this.on('NewCVTiktok', ({
            ttq
        }, payload) => {
            ttq.instance('C3DCKS2TO1NMNN16KQ1G').track('NewCVTiktok');
        })
        this.on('NewUser', ({
            ga
        }, payload) => {
            initTracker();
            ga(tracker + '.send', 'event', 'NewUser', 'NewUser', 1);
        })
        this.on('NewUserFB', ({
            fbq
        }, payload) => {
            fbq('track', 'NewUserFB');
        })
        this.on('NewUserGG', ({
            gtag
        }, payload) => {
            gtag('event', 'NewUserGG', {
                'send_to': 'AW-823531084/YRfKCIPOp9gBEMys2IgD'
            });
        })
        this.on('NewUserTiktok', ({
            ttq
        }, payload) => {
            ttq.instance('C3DCKS2TO1NMNN16KQ1G').track('NewUserTiktok');
        })
        this.on('SearchJobGG', ({
            gtag
        }, payload) => {
            gtag('event', 'SearchJobGG', {
                'send_to': 'AW-823531084/KjNNCMCEkZQDEMys2IgD'
            });
        })
        this.on('OnJobGG', ({
            gtag
        }, payload) => {
            gtag('event', 'OnJobGG', {
                'send_to': 'AW-823531084/94g_CPuNipQDEMys2IgD'
            });
        })
        this.on('NewFourYearsExpCvGG', ({
            gtag
        }, payload) => {
            gtag('event', 'NewFourYearsExpCvGG', {
                'send_to': 'AW-823531084/SQSXCM2RkZQDEMys2IgD'
            });
        })
        this.on('EditFourYearsExpCvGG', ({
            gtag
        }, payload) => {
            gtag('event', 'EditFourYearsExpCvGG', {
                'send_to': 'AW-823531084/sYXhCKmRkZQDEMys2IgD'
            });
        })
        this.on('FourYearsCvApplyGG', ({
            gtag
        }, payload) => {
            gtag('event', 'FourYearsCvApplyGG', {
                'send_to': 'AW-823531084/l_GECJPW25MDEMys2IgD'
            });
        })
    }
})
$(function() {
    if (trackingQueue) {
        setTimeout(function() {
            trackingApp.setQueue(trackingQueue).processQueue()
        }, 3000)
    }
    $(document).ajaxSuccess(function(event, xhr, settings) {
        setTimeout(function() {
            let response = xhr.responseJSON
            if (response && response.tracking_queue) {
                trackingApp.setQueue(response.tracking_queue).processQueue()
            }
        }, 500)
    })
})