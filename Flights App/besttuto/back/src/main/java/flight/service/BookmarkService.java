/**
 * 
 */
package flight.service;

import java.util.List;

import flight.models.Bookmark;

/**
 * @author BestTutorials
 *
 */
public interface BookmarkService {
    Bookmark addBookmark(Bookmark bookmark);
    List<Bookmark> getBookmarkList(String userName);
    void deleteBookmark(Long idBookmark);
}
