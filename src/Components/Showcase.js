import { Link } from "react-router-dom";


const Showcase = () => {

    return(
        <div className="showcase">
            <div className="showcase_subtitle">
                <p>冬日暖意</p>
            </div>
            <div className="showcase_top">
                <div className="showcase_item">
                    <Link to="/"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/women/w_OUTERWEAR_7.jpg"  alt="大衣" /></Link>
                    <Link to="/"><h1>大衣</h1></Link>
                    <Link to="/"><p>俐落設計，輕盈時尚，層次穿搭必備。</p></Link>
                </div>
                <div className="showcase_item">
                    <Link to="/"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/women/w_OUTERWEAR_5.jpg" alt="西裝 / 外套" /></Link>
                    <Link to="/"><h1>西裝 / 外套</h1></Link>
                    <Link to="/"><p>西裝款、休閒款，一應俱全。經典時尚，百搭易襯。</p> </Link>
                </div>
                <div className="showcase_item">
                    <Link to="/"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/women/w_OUTERWEAR_2.jpg" alt="羽絨" /></Link>
                    <Link to="/"><h1>羽絨</h1></Link>
                    <Link to="/"><p>極致溫暖，設計俐落而不顯臃腫。適合不同場合穿著的羽絨外套。</p></Link>
                </div>
            </div>
            <div className="showcase_subtitle">
                <p>簡約悠閒</p>
            </div>
            <div className="showcase_bottom">
            <div className="showcase_item">
                    <Link to="/"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/women/w_top_8.jpg"  alt="短袖T卹 / 背心" /></Link>
                    <Link to="/"><h1>短袖T卹 / 背心</h1></Link>
                    <Link to="/"><p>全年適穿的T 卹及背心系列，用料優質，簡約時尚，單穿或作層次穿搭皆宜。</p></Link>
                </div>
                <div className="showcase_item">
                    <Link to="/"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/men/m_top_5.jpg" alt="休閒恤衫" /></Link>
                    <Link to="/"><h1>休閒恤衫</h1></Link>
                    <Link to="/"><p>充滿季節風格的顏色，簡約設計，百搭易襯。</p> </Link>
                </div>
                <div className="showcase_item">
                    <Link to="/"><img src="https://www.uniqlo.com.hk/public/image/L3/2022/l2_lineup/1125/men/m_top_7.jpg" alt="長袖 / 7分袖T卹" /></Link>
                    <Link to="/"><h1>長袖 / 7分袖T卹</h1></Link>
                    <Link to="/"><p>色彩豐富的T 卹，無論是淨色款式或設計款式，都是全年活躍的必備單品！</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Showcase;