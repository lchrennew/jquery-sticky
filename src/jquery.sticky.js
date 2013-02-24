
!function ($) {
    function Sticky(options) {
        var _this = this
        this.target = options.target.css({ overflow: 'auto' })
        this.self = options.self.css({ position: 'relative' }).wrap('<div></div>')
        this.parent = this.self.parent().css({ overflow: 'hidden', position: 'fixed' })
        this.direction = options.direction
        this.align = options.align
        this.position = this['position_' + options.position]
        var sheight =
                (this.align ? this.align.outerHeight() : this.target[0].scrollHeight)
                 - parseInt(this.self.css('padding-top'))
                  - parseInt(this.self.css('padding-bottom'))
                   - parseInt(this.self.css('border-top-width'))
                    - parseInt(this.self.css('border-bottom-width'))
        var swidth =
                (this.align ? this.align.outerWidth() : this.target[0].scrollWidth)
                 - parseInt(this.self.css('padding-left'))
                  - parseInt(this.self.css('padding-right'))
                   - parseInt(this.self.css('border-left-width'))
                    - parseInt(this.self.css('border-right-width'))

        switch (options.position) {
            case 'left':
                this.target
                .width(this.target.width() - this.self.outerWidth())
                .css({ 'padding-left': this.self.outerWidth() })
                .scroll(function () {
                    _this.parent.scrollTop($(this).scrollTop())
                })

                this.parent.height(this.target[0].clientHeight)

                this.self
                    .height(sheight)
                    .css({ top: (this.align ? this.align.position().top : 0) })
                break;
            case 'right':
                this.target
                .width(this.target.width() - this.self.outerWidth())
                .css({ 'padding-right': this.self.outerWidth() })
                .scroll(function () {
                    _this.parent.scrollTop($(this).scrollTop())
                })
                if (this.target.innerWidth() < this.target[0].scrollWidth)
                    this.target.append($('<div></div>').width(this.self.outerWidth() + this.target[0].scrollWidth).height(1).css({ visibility: 'hidden', 'margin-top': -1, clear: 'both'  }))
                this.parent.height(this.target[0].clientHeight)
                this.self
                    .height(sheight)
                    .css({ top: (this.align ? this.align.position().top : 0) })
                break;
            case 'bottom':
                this.target
                .height(this.target.height() - this.self.outerHeight())
                .css({ 'padding-bottom': this.self.outerHeight() })
                .scroll(function () {
                    _this.parent.scrollLeft($(this).scrollLeft())
                })
                
                this.parent.width(this.target[0].clientWidth)

                this.self
                .width(swidth)
                .css({ left: (this.align ? this.align.position().left : 0) })
                break;
            case 'top':
            default:
                this.target
                .height(this.target.height() - this.self.outerHeight())
                .css({ 'padding-top': this.self.outerHeight() })
                .scroll(function () {
                    _this.parent.scrollLeft($(this).scrollLeft())
                })
                this.parent.width(this.target[0].clientWidth)

                this.self
                .width(swidth)
                .css({ left: (this.align ? this.align.position().left : 0) })
                break;
        }

        this.position()
        $(window).on('scroll resize', function () { _this.position() })
    }

    Sticky.prototype.position_top = function () {
        var target = this.target
        , self = this.self
        , parent = this.parent
        , align = this.align
        , _this = this


        var ptop = -$(window).scrollTop() + target.offset().top + parseInt(target.css('border-top-width'))
        , pleft = -$(window).scrollLeft() + target.offset().left + parseInt(target.css('border-left-width'))
        parent.css({
            top: ptop
            , left: pleft
        })

    }

    Sticky.prototype.position_bottom = function () {
        var target = this.target
        , self = this.self
        , parent = this.parent
        , align = this.align
        , _this = this


        var ptop = -$(window).scrollTop() + target.offset().top + parseInt(target.css('border-top-width')) + target[0].clientHeight - self.outerHeight()
        , pleft = -$(window).scrollLeft() + target.offset().left + parseInt(target.css('border-left-width'))
        parent.css({
            top: ptop
            , left: pleft
        })
    }

    Sticky.prototype.position_left = function () {
        var target = this.target
        , self = this.self
        , parent = this.parent
        , align = this.align
        , _this = this

        var ptop = -$(window).scrollTop() + target.offset().top + parseInt(target.css('border-top-width'))
        , pleft = -$(window).scrollLeft() + target.offset().left + parseInt(target.css('border-left-width'))

        parent.css({
            top: ptop
            , left: pleft
        })
    }

    Sticky.prototype.position_right = function () {

        var target = this.target
        , self = this.self
        , parent = this.parent
        , align = this.align
        , _this = this

        var ptop = -$(window).scrollTop() + target.offset().top + parseInt(target.css('border-top-width'))
        , pleft = -$(window).scrollLeft() + target.offset().left + parseInt(target.css('border-left-width')) + target[0].clientWidth - self.outerWidth()

        parent.css({
            top: ptop
            , left: pleft
        })
    }



    var stickyDefaults = { y: '0' }
    $.fn.extend({
        sticky: function (options) {
            $(this).each(function () {
                var s = $(this)
                var opts = $.extend(stickyDefaults,
                {
                    direction: s.attr('data-sticky-direction')
                    , target: $(s.attr('data-stickty-target') || s.parent())
                    , position: s.attr('data-sticky-position')
                    , align: s.attr('data-sticky-align') ? $(s.attr('data-sticky-align')) : null
                    , self: s
                },
                options)
                opts.target.length && new Sticky(opts)

            })
        }
    })
    $(function () {
        $('[data-sticky-direction]').sticky()

    })
} (jQuery)