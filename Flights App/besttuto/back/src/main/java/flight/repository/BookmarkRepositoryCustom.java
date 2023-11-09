/**
 * 
 */
package flight.repository;

import java.util.List;

import flight.models.Bookmark;

/**
 * @author BestTutorials
 *
 */
public interface BookmarkRepositoryCustom {
    List<Bookmark> getBookmarkList(String userName);
}
